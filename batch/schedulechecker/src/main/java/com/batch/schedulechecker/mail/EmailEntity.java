package com.batch.schedulechecker.mail;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class EmailEntity {

	private String to;
	private String subject;
	private String text;
	private String attachment;

}
