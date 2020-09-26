package backend;

import java.util.Date;
import java.time.format.DateTimeFormatter;

public class Airport {
    // props
    String name;
    String city;
    String description;
    Date createdAt = new Date();
    DateTimeFormatter dtf;
    Runway runway = new Runway();
    
    public Airport() {
        name = "";
        city = "";
        description = "";
        dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    }
}
