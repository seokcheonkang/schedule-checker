package com.batch.schedulechecker.job;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

	@Bean
	public Job job1() {
		log.info("job1 is called!");
		return jobBuilderFactory.get("job1").incrementer(new RunIdIncrementer()).start(step1()).next(step2()).build();
	}

	@Bean
	public Step step1() {
		log.info("step1 is called!");
		return stepBuilderFactory.get("step1").tasklet(new Task1()).build();
	}

	@Bean
	public Step step2() {
		log.info("step2 is called!");
		return stepBuilderFactory.get("step2").tasklet(new Task2()).build();
	}

}