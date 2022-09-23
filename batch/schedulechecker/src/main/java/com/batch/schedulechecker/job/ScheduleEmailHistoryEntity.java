package com.batch.schedulechecker.job;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ScheduleEmailHistoryEntity {

	private String user_email;
	private int schedule_code;
	private String title;
	private String limit_date;

	@Override
	public String toString() {
		return "ScheduleEntity [user_email=" + user_email + ", schedule_code=" + schedule_code + ", title=" + title
				+ ", limit_date=" + limit_date + "]";
	}

}
