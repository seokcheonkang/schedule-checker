package com.batch.schedulechecker.job.withinTwoDay;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.JdbcPagingItemReader;
import org.springframework.batch.item.database.Order;
import org.springframework.batch.item.database.PagingQueryProvider;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.database.builder.JdbcPagingItemReaderBuilder;
import org.springframework.batch.item.database.support.SqlPagingQueryProviderFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.batch.schedulechecker.job.ScheduleEmailHistoryEntity;
import com.batch.schedulechecker.mail.EmailEntity;
import com.batch.schedulechecker.mail.EmailService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class BatchConfigNotifyExpiredSchedulesWithinTwoDays {

	@Autowired
	private JobBuilderFactory jobBuilderFactory;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Autowired
	private DataSource dataSource;

	@Autowired
	EmailService emailService;
	
	@Value("${custom.BASE_URL_THIS}")
	String BASE_URL_THIS;
	
	@Value("${custom.SCHEDULE_NOTI_LIMIT_DAY}")
	int SCHEDULE_NOTI_LIMIT_DAY;
	
	@Bean
	public Job jobNotifyExpiredSchedulesWithinTwoDays() {
		return jobBuilderFactory.get("stepNotifyExpiredSchedulesWithinTwoDays").start(stepNotifyExpiredSchedulesWithinTwoDays()).build();
	}

	@Bean
	@JobScope
	public Step stepNotifyExpiredSchedulesWithinTwoDays() {
		Step step = null;
		
		try {
			step = stepBuilderFactory.get("stepNotifyExpiredSchedulesWithinTwoDays").<ScheduleEmailHistoryEntity, ScheduleEmailHistoryEntity>chunk(10)
			.reader(readerNotifyExpiredSchedulesWithinTwoDays()).processor(processorNotifyExpiredSchedulesWithinTwoDays()).writer(writerNotifyExpiredSchedulesWithinTwoDays()).build();
		} catch (Exception e) {
			e.printStackTrace();
			log.error("[EXCEPTION] stepNotifyExpiredSchedulesWithinTwoDays()");
		}

		return step;
	}

	@Bean
	@StepScope
	public JdbcPagingItemReader<ScheduleEmailHistoryEntity> readerNotifyExpiredSchedulesWithinTwoDays() throws Exception {
		Map<String, Object> parameterValues = new HashMap<>();

		return new JdbcPagingItemReaderBuilder<ScheduleEmailHistoryEntity>().pageSize(10).fetchSize(10).dataSource(dataSource)
				.rowMapper(new BeanPropertyRowMapper<>(ScheduleEmailHistoryEntity.class)).queryProvider(queryProviderNotifyExpiredSchedulesWithinTwoDays())
				.parameterValues(parameterValues).name("JdbcPagingItemReader").build();
	}

	@Bean
	@StepScope
	public ItemProcessor<ScheduleEmailHistoryEntity, ScheduleEmailHistoryEntity> processorNotifyExpiredSchedulesWithinTwoDays() throws Exception {
		return new ItemProcessor<ScheduleEmailHistoryEntity, ScheduleEmailHistoryEntity>() {
			@Override
			public ScheduleEmailHistoryEntity process(ScheduleEmailHistoryEntity scheduleEmailHistoryEntity) throws Exception {
				EmailEntity emailEntity = new EmailEntity();
				
				// target
				emailEntity.setTo(scheduleEmailHistoryEntity.getUser_email());

				// subject
				emailEntity.setSubject("[Schedule Checker] 스케줄 만료 예정 알림");

				// content
				String title = scheduleEmailHistoryEntity.getTitle();
				int day = SCHEDULE_NOTI_LIMIT_DAY;
				String url = BASE_URL_THIS;
				int seq = scheduleEmailHistoryEntity.getSchedule_code();
				String content = "";
				content += "안녕하세요? Schedule Checker 관리자입니다.";
				content += System.lineSeparator();
				content += System.lineSeparator();
				content += "스케줄이 " + day + "일 이내로 만료될 예정입니다.";
				content += System.lineSeparator();
				content += System.lineSeparator();
				content += "제목 : " + title;
				content += System.lineSeparator();
				content += "바로가기 : " + url + "/schedules/" + seq;
				content += System.lineSeparator();
				content += System.lineSeparator();
				content += "감사합니다.";

				emailEntity.setText(content);
				
				log.debug(emailEntity.toString());

				String result = emailService.sendSimpleMail(emailEntity);
				log.info("[RESULT] sendSimpleMail : {}", result);

				return scheduleEmailHistoryEntity;
			}
		};

	}

	@Bean
	@StepScope
	public JdbcBatchItemWriter<ScheduleEmailHistoryEntity> writerNotifyExpiredSchedulesWithinTwoDays() throws Exception {
		String sqlInsert = "";
		sqlInsert += "insert into tb_schedule_email_history ( ";
		sqlInsert += "user_email, schedule_code, title, limit_date ";
		sqlInsert += ") ";
		sqlInsert += "values ( ";
		sqlInsert += ":user_email, :schedule_code, :title, :limit_date ";
		sqlInsert += ") ";
		
		return new JdbcBatchItemWriterBuilder<ScheduleEmailHistoryEntity>().dataSource(dataSource)
				.sql(sqlInsert).beanMapped().build();
	}

	public PagingQueryProvider queryProviderNotifyExpiredSchedulesWithinTwoDays() throws Exception {
		SqlPagingQueryProviderFactoryBean queryProviderFactoryBean = new SqlPagingQueryProviderFactoryBean();

		queryProviderFactoryBean.setDataSource(dataSource);

		String sqlSelect = "";
		sqlSelect += "select ts.schedule_code                                                                         ";
		sqlSelect += "     , ts.title                                                                                 ";
		sqlSelect += "     , ts.limit_date                                                                            ";
		sqlSelect += "     , tsd.user_email                                                                           ";

		String sqlFrom = "";
		sqlFrom   += "  from tb_schedule ts                                                                           ";
		sqlFrom   += " inner join tb_schedule_detail tsd                                                              ";
		sqlFrom   += "    on ts.schedule_code = tsd.schedule_code                                                     ";
		sqlFrom   += "   and tsd.status != '99'                                                                       ";

		String sqlWhere = "";
		sqlWhere  += " where 1=1                                                                                      ";
		sqlWhere  += "   and ts.status = '99'                                                                         ";
		sqlWhere  += "   and ts.limit_date <= date_add(now(), interval 2 day)                                         ";
		sqlWhere  += "   and (tsd.user_email, ts.schedule_code ) not in (                                             ";
		sqlWhere  += "                                                   select user_email                            ";
		sqlWhere  += "                                                        , schedule_code                         ";
		sqlWhere  += "                                                     from tb_schedule_email_history tseh        ";
		sqlWhere  += "                                                    where 1=1                                   ";
		sqlWhere  += "                                                      and tsd.user_email = tseh.user_email      ";
		sqlWhere  += "                                                      and ts.schedule_code = tseh.schedule_code ";
		sqlWhere  += "                                                  )                                             ";

		queryProviderFactoryBean.setSelectClause(sqlSelect);
		queryProviderFactoryBean.setFromClause(sqlFrom);
		queryProviderFactoryBean.setWhereClause(sqlWhere);

		Map<String, Order> sortKey = new HashMap<>();
		sortKey.put("schedule_code", Order.ASCENDING);

		queryProviderFactoryBean.setSortKeys(sortKey);

		return queryProviderFactoryBean.getObject();
	}

}