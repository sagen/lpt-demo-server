package no.sb1.lpt;

import com.sun.jersey.spi.container.servlet.ServletContainer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class Launcher {
    public static void main(String[] args) throws Exception {
        Server server = new Server(Integer.valueOf(System.getenv("PORT")));


        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        ServletHolder servletHolder = new ServletHolder(ServletContainer.class);
        servletHolder.setInitParameter("com.sun.jersey.api.json.POJOMappingFeature", "true");
        servletHolder.setInitParameter("com.sun.jersey.config.property.packages", "no.sb1.lpt.resources");
        context.addServlet(servletHolder, "/*");
        server.setHandler(context);
        //context.addServlet(new ServletHolder(new HelloWorld()),"/*");
        server.start();
        server.join();
    }
}
