package com.batch.schedulechecker.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailEntity {

	// Class data members
	private String to;
	private String text;
	private String subject;
	private String attachment;
}
