package com.batch.schedulechecker.mail;

public interface EmailService {

	/**
	 * To send a simple email
	 * @param details
	 * @return
	 */
	public String sendSimpleMail(EmailEntity emailEntity);

	/**
	 * To send an email with attachment
	 * @param details
	 * @return
	 */
	public String sendMailWithAttachment(EmailEntity emailEntity);
}
