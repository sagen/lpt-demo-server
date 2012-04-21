package no.sb1.lpt.repository;

import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.Member;
import no.sb1.lpt.repository.DataGenerator;

import java.util.*;

public class DataStore {
    public static Map<Integer, Company> companies = DataGenerator.data();

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
