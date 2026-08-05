package com.SquadStation.user_service.servicesImpl;

import com.SquadStation.user_service.services.OtpMailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OtpMailServiceImpl implements OtpMailService {
    private final JavaMailSender javaMailSender;
    @Value("${app.mail.from}")
    private String fromEmail;

    @Override
    public void sendOtp(String recipientEmail, String otp) {
        try {

            System.out.println("Attempting to send mail to :"+ recipientEmail);
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(recipientEmail);
            helper.setSubject("Your SquadStation Verification Code");
            String htmlContent = """
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>Welcome to SquadStation!</h2>
                        <p>Your verification code is: <strong style="font-size: 24px; color: #4CAF50;">%s</strong></p>
                        <p>This code expires in 10 minutes.</p>
                        <p style="color: red; font-size: 12px;">Do not share this code with anyone.</p>
                    </div>
                    """.formatted(otp);

            helper.setText(htmlContent, true);
        javaMailSender.send(message);
    }
        catch (Exception e){
            System.err.println("Error while sending otp:" +e.getMessage());
            e.printStackTrace();

        }
    }
}
