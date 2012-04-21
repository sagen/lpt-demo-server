package no.sb1.lpt.model;

import java.util.*;

import static java.util.Collections.synchronizedMap;
import static no.sb1.lpt.Util.generateId;

public class DataStore {
    public static Map<Integer, Company> companies = companies();


    private static Map<Integer, Member> members3(){
        Member m1 = new Member("Arne");
        Member m2 = new Member("Kjell");
        Member m3 = new Member("Anne");
        Member m4 = new Member("Bjarne");
        Member m5 = new Member("Kalle");
        return map(m1, m2, m3, m4, m5);
    }

    private static Map<Integer, Member> members2(){
        Member m1 = new Member("Olav");
        Member m2 = new Member("Ingrid");
        Member m3 = new Member("Kari");
        Member m4 = new Member("Mari");
        Member m5 = new Member("Kathrine");
        return map(m1, m2, m3, m4, m5);

    }

    private static Map<Integer, Member> members1(){
        Member m1 = new Member("Espen");
        Member m2 = new Member("Pia");
        Member m3 = new Member("Kaja");
        Member m4 = new Member("Mari");
        Member m5 = new Member("Askeladden");
        return map(m1, m2, m3, m4, m5);
    }

    private static Map<Integer, Agreement> agreements(){
        Agreement a1 = new Agreement("Avtale 1", members1());
        Agreement a2 = new Agreement("Avtale 2", members2());
        Agreement a3 = new Agreement("Avtale 3", members3());
        return map(a1, a2, a3);
    }

    private static Map<Integer, Company> companies(){
        return map(new Company("Snekker", agreements()), new Company("Maler", agreements()),
                new Company("Blomsterforretning", agreements()), new Company("Kakedekoratør", agreements()));
    }

    private static <V> Map<Integer, V> map(V... values){
        Map<Integer, V> map = synchronizedMap(new HashMap<Integer, V>());
        for(V value : values){
            map.put(generateId(), value);
        }
        return map;
    }

    public static Company company(Integer companyId){
        return companies.get(companyId);
    }

    public static Agreement agreement(Integer companyId, Integer agreementId){
        if(company(companyId) == null)
            return null;
        return company(companyId).agreements.get(agreementId);
    }

    public static Member member(Integer companyId, Integer agreementId, Integer memberId){
        if(agreement(companyId, agreementId) == null)
            return null;
        return agreement(companyId, agreementId).members.get(memberId);
    }




}
