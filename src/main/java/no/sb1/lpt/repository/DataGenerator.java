package no.sb1.lpt.repository;

import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.Identifiable;
import no.sb1.lpt.model.Member;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static java.util.Collections.synchronizedMap;
import static no.sb1.lpt.Util.generateId;


public class DataGenerator {
    private static Random generator = new Random();

    private static Map<Integer, Agreement> agreements() {
        Agreement a1 = new Agreement("Avtale 1", members());
        Agreement a2 = new Agreement("Avtale 2", members());
        Agreement a3 = new Agreement("Avtale 3", members());
        return map(a1, a2, a3);
    }

    static Map<Integer, Company> data() {
        return map(new Company("Snekker", agreements()), new Company("Maler", agreements()),
                new Company("Blomsterforretning", agreements()), new Company("Kakedekoratør", agreements()));
    }

    private static Map<Integer, Member> members() {
        Member[] members = new Member[generator.nextInt(5) + 2];
        for (int x = 0; x < members.length; x++) {
            members[x] = member();
        }
        return map(members);
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


    private static <V extends Identifiable> Map<Integer, V> map(V... values) {
        Map<Integer, V> map = synchronizedMap(new HashMap<Integer, V>());
        for (V value : values) {
            map.put(value.id, value);
        }
        return map;
    }
}
