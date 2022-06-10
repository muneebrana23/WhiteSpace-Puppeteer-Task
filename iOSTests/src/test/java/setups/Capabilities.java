package setups;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.URL;
import java.util.concurrent.TimeUnit;

public class Capabilities extends DesiredCapabilities {
    protected AndroidDriver androidDriver;
    private AppiumDriverLocalService service;
    protected IOSDriver iosDriver;
    private AppiumDriverLocalService service_ios;

    protected void preparation() throws Exception {

        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "XCUITest");
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPad Pro (9.7-inch)");
        capabilities.setCapability(MobileCapabilityType.UDID, "47B7914C-24F8-4F91-8C62-47BB5D421E69");
        capabilities.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT, 18000);
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "15.0");
        capabilities.setCapability("showXcodeLog", false);
        capabilities.setCapability("useNewWDA", false);
        capabilities.setCapability("wdaLocalPort", 9373);
        capabilities.setCapability("maxTypingFrequency", 50);
        capabilities.setCapability("wdaConnectionTimeout", 7200000);
        capabilities.setCapability("wdaLaunchTimeout", 7200000);

        service_ios = AppiumDriverLocalService.buildDefaultService();
        service_ios.start();
        String service_url = service_ios.getUrl().toString();
        System.out.println("Appium Service Address: " + service_url);

        iosDriver = new IOSDriver(new URL(service_url), capabilities);
        iosDriver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    public void stopServer() {
        service.stop();
    }
}
