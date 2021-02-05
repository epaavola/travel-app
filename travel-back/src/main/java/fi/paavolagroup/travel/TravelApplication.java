package fi.paavolagroup.travel;

import java.security.Security;

import javax.annotation.Resource;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import fi.paavolagroup.travel.service.FilesStorageService;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class})
public class TravelApplication implements CommandLineRunner {

	@Resource
	FilesStorageService storageService;
  
	public static void main(String[] args) {
		Security.addProvider(new BouncyCastleProvider());
		SpringApplication.run(TravelApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
	  storageService.init();
	}
}
