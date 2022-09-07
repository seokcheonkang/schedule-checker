package com.batch.schedulechecker;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.batch.schedulechecker.mail.EmailEntity;
import com.batch.schedulechecker.mail.EmailService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableScheduling // REQUIRED : Spring Scheduling
@EnableBatchProcessing // REQUIRED : Spring Batch
@SpringBootApplication // REQUIRED : Spring Boot
public class SchedulecheckerApplication {

	@Autowired
	JobLauncher jobLauncher;

	@Autowired
	Job job;

	@Autowired
	EmailService emailService;
	
	@Scheduled(cron = "0 0/1 * * * ?")
//	@Scheduled(fixedDelayString = "${custom.delay}")
	public void perform() throws Exception {
		EmailEntity emailEntity = new EmailEntity();
		emailEntity.setTo("idealful@naver.com");
		emailEntity.setSubject("제목1");
		emailEntity.setText("내용1");
		
		String result = emailService.sendSimpleMail(emailEntity);
		log.info("result : {}", result);
		
		JobParameters params = new JobParametersBuilder().addString("JobID", String.valueOf(System.currentTimeMillis()))
				.toJobParameters();
		jobLauncher.run(job, params);
	}
	

	public static void main(String[] args) {
		SpringApplication.run(SchedulecheckerApplication.class, args);
	}

}
