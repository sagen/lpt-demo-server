package no.sb1.lpt.repository;

import com.sun.jersey.api.NotFoundException;
import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.Entity;
import no.sb1.lpt.model.Member;

import java.util.*;

import static java.lang.String.format;

public class DataStore {
    private static Map<Integer, Company> companies = DataGenerator.data();

    public static Collection<Company> companies(){
        return companies.values();
    }

    public static Company company(int companyId){
        if(companies.containsKey(companyId))
            return companies.get(companyId);
        return notFoundException(Company.class);
    }

    public static Agreement agreement(int companyId, int agreementId){
        if(company(companyId).agreements.containsKey(agreementId))
            return company(companyId).agreements.get(agreementId);
        return notFoundException(Agreement.class);
    }

    public static Member member(int companyId, int agreementId, int memberId){
        if(agreement(companyId, agreementId).members.containsKey(memberId))
            return agreement(companyId, agreementId).members.get(memberId);
        return notFoundException(Member.class);
    }

    public static Member addMember(int companyId, int agreementId, Member member){
        agreement(companyId, agreementId).members.put(member.id, member);
        return member;
    }

    public static Agreement addAgreement(int companyId, Agreement agreement) {
        company(companyId).agreements.put(agreement.id, agreement);
        return agreement;
    }

    private static <T extends Entity> T notFoundException(Class<T> clazz) throws NotFoundException {
        throw new NotFoundException(format("%s not found", clazz.getSimpleName()));
    }
}
