package no.sb1.lpt.repository;

import static no.sb1.lpt.model.Agreement.Status.*;

import java.util.Date;
import java.util.Map;
import java.util.Random;

import no.sb1.lpt.Util;
import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.Member;


public class DataGenerator {
    private static Random generator = new Random();

    private static Map<Integer, Agreement> agreements() {
        return Util.map(agreement(), agreement(), agreement());
    }

    private static Agreement agreement(){
        return new Agreement(members(), agreementNumber(), status(), registered(),minimumAge());
    }

    static Map<Integer, Company> data() {
        return Util.map(new Company("Snekker", agreements()), new Company("Maler", agreements()),
                new Company("Blomsterforretning", agreements()), new Company("Kakedekoratør", agreements()));
    }

    private static Map<Integer, Member> members() {
        Member[] members = new Member[generator.nextInt(5) + 2];
        for (int x = 0; x < members.length; x++) {
            members[x] = member();
        }
        return Util.map(members);
    }

    private static String rand(String... elms) {
        return elms[generator.nextInt(elms.length)];
    }

    private static Member member() {
        return new Member(fnr(), name(), salary(), registered());
    }

    private static String name() {
        return rand(new String[]{"Arne", "Kjell", "Anne", "Bjarne", "Kalle", "Olav", "Ingrid", "Kari", "Mari", "Kathrine", "Espen", "Pia", "Kaja", "Mari"})
                + " "
                + rand(new String[]{"Olsen", "Gundersen", "Hansen", "Braathen", "Jansen", "Karlsen", "Nilsen"});
    }

    private static String fnr() {
        return rand(new String[]{"22048345763", "24077045801", "24077035253", "10107247098", "10107239540", "10107233860",
                "28107944879", "31107948999", "28107948033", "14013946044", "25013947352", "15013947462", "02013948197",
                "08013945811", "01013943423", "22013943838"});
    }

    private static int salary() {
        return (generator.nextInt(800) + 200) * 1000;

    }

    private static Date registered() {
        long year = (365L * 24L * 60L * 60L * 1000L);
        return new Date(System.currentTimeMillis() - (generator.nextInt(60) + 20) * year);

    }


    private static int minimumAge(){
        return generator.nextInt(6) + 16;
    }
    private static int agreementNumber(){
        return generator.nextInt();
    }
    private static Agreement.Status status(){
        return generator.nextBoolean() ? ACTIVE : SUSPENDED;
    }
}
