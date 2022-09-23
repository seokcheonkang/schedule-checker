package com.batch.schedulechecker.job;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@EnableBatchProcessing
@Component
public class BatchExecutor {

	@Autowired
	JobLauncher jobLauncher;

	@Autowired
	Job job;

	@Scheduled(fixedRateString = "${custom.INTERVAL}")
	public void perform() throws Exception {
		JobParameters jobParameters = new JobParametersBuilder()
				.addString("JobID", String.valueOf(System.currentTimeMillis())).toJobParameters();
		jobLauncher.run(job, jobParameters);
	}
}
