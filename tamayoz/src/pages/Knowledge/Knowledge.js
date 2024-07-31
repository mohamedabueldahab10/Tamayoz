import React from 'react';
import HierarchyChart from '../../components/orgChart/HierarchyChart';
import CompanyModule from '../../components/company/CompanyModule';
import DepartmentModule from '../../components/department/DepartmentModule';
import BankAccountModule from '../../components/bankAcc/BankAccountModule';
import NewBankModule from '../../components/bankAcc/NewBankModule';
import JobPositionModule from '../../components/jobPosition/JobPositionModule';
import RelatedUsersModule from '../../components/relatedUsers/RelatedUsersModule';
import DegreeModule from '../../components/degree/DegreeModule';
export default function Knowledge() {
  return (
    <div>
      <HierarchyChart />
    </div>
  );
}
