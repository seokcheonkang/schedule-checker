package com.batch.schedulechecker.job;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class ScheduleEmailHistoryEntity {

	private String user_email;
	private int schedule_code;
	private String title;
	private String limit_date;

}
