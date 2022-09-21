package com.batch.schedulechecker.job;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.batch.schedulechecker.mail.EmailEntity;
import com.batch.schedulechecker.mail.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Configuration
public class JobConfiguration {

	@Autowired
	private JobBuilderFactory jobBuilderFactory;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Autowired
	EmailService emailService;

	@Bean
	public Job job1() {
		log.info("job1 is called!");
		return jobBuilderFactory.get("job1").incrementer(new RunIdIncrementer()).start(step1()).next(step2()).build();
	}

	@Bean
	public Step step1() {
		log.info("job1 > step1 is called!");
		
		return stepBuilderFactory.get("step1").tasklet((contribution, chunkContext) -> {
			log.info("job1 > step1 > task start!");
			
			EmailEntity emailEntity = new EmailEntity();
			emailEntity.setTo("idealful@naver.com");
			emailEntity.setSubject("제목1");
			emailEntity.setText("내용1");

			String result = emailService.sendSimpleMail(emailEntity);
			log.info("result : {}", result);
			
			log.info("job1 > step1 > task end!");

			return RepeatStatus.FINISHED;
		}).build();
	}

	@Bean
	public Step step2() {
		log.info("job1 > step2 is called!");
		
		return stepBuilderFactory.get("step2").tasklet((contribution, chunkContext) -> {
			log.info("job1 > step2 > task start!");
			
			EmailEntity emailEntity = new EmailEntity();
			emailEntity.setTo("idealful@naver.com");
			emailEntity.setSubject("제목2");
			emailEntity.setText("내용2");

			String result = emailService.sendSimpleMail(emailEntity);
			log.info("result : {}", result);
			
			log.info("job1 > step2 > task end!");

			return RepeatStatus.FINISHED;
		}).build();
	}

}