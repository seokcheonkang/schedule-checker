package com.batch.schedulechecker.mail;

import java.io.File;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${spring.mail.username}")
	private String sender;

	private String SUCCESS = "Mail sent Successfully";
	private String FAIL = "Error while sending mail!!!";

	/**
	 * To send a simple email
	 */
	@Override
	public String sendSimpleMail(EmailEntity emailEntity) {
		String result = this.FAIL;

		try {
			// Creating a simple mail message
			SimpleMailMessage mailMessage = new SimpleMailMessage();

			// Setting up necessary details
			mailMessage.setFrom(sender);
			mailMessage.setTo(emailEntity.getTo());
			mailMessage.setSubject(emailEntity.getSubject());
			mailMessage.setText(emailEntity.getText());

			// Sending the mail
			javaMailSender.send(mailMessage);

			result = this.SUCCESS;

			log.info("sender : {}", sender);
			log.info("entity : {}", emailEntity);
		} catch (Exception e) {
			result = this.FAIL;
		} finally {
			log.info("result : {}", result);
		}
		
		return result;
	}

	/**
	 * To send an email with attachment
	 */
	@Override
	public String sendMailWithAttachment(EmailEntity emailEntity) {
		String result = this.FAIL;

		// Creating a mime message
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper;

		try {
			// Setting multipart as true for attachments to be send
			mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setFrom(sender);
			mimeMessageHelper.setTo(emailEntity.getTo());
			mimeMessageHelper.setText(emailEntity.getText());
			mimeMessageHelper.setSubject(emailEntity.getSubject());

			// Adding the attachment
			FileSystemResource file = new FileSystemResource(new File(emailEntity.getAttachment()));

			mimeMessageHelper.addAttachment(file.getFilename(), file);

			// Sending the mail
			javaMailSender.send(mimeMessage);

			result = this.SUCCESS;

			log.info("sender : {}", sender);
			log.info("entity : {}", emailEntity);
		} catch (Exception e) {
			result = this.FAIL;
		} finally {
			log.info("result : {}", result);
		}
		
		return result;
	}
}
