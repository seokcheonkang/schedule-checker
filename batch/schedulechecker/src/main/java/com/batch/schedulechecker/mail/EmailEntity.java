package com.batch.schedulechecker.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailEntity {

	private String to;
	private String subject;
	private String text;
	private String attachment;

	@Override
	public String toString() {
		return "EmailEntity [to=" + to + ", subject=" + subject + ", text=" + text + ", attachment=" + attachment + "]";
	}
}
