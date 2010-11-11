<%@ WebService Language="C#" Class="Composite.Services.SearchEngineOptimizationKeyword" %>

using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.Transactions;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Users;
using Composite.Core.Linq;
using Composite.Data.Transactions;


namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class SearchEngineOptimizationKeyword : System.Web.Services.WebService
    {

        [WebMethod]
        public bool SaveKeyWords(List<string> keywords)
        {
            using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
            {
                using (TransactionScope transactionScope = TransactionsFacade.Create(true))
                {
                    IEnumerable<ISearchEngineOptimizationKeyword> existingKeywords = DataFacade.GetData<ISearchEngineOptimizationKeyword>().Evaluate();

                    foreach (string keyword in keywords)
                    {
                        if (existingKeywords.Where(f => f.Keyword == keyword).Any() == false)
                        {
                            ISearchEngineOptimizationKeyword newKeyword = DataFacade.BuildNew<ISearchEngineOptimizationKeyword>();
                            newKeyword.Keyword = keyword;
                            DataFacade.AddNew(newKeyword);
                        }
                    }

                    foreach (ISearchEngineOptimizationKeyword existingKeyword in existingKeywords)
                    {
                        if (keywords.Contains(existingKeyword.Keyword) == false)
                        {
                            DataFacade.Delete(existingKeyword);
                        }
                    }

                    transactionScope.Complete();
                }
            }

            return true;
        }




        [WebMethod]
        public List<string> GetKeyWords(bool dummy)
        {
            using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
            {
                IEnumerable<ISearchEngineOptimizationKeyword> keywords = DataFacade.GetData<ISearchEngineOptimizationKeyword>().Evaluate();

                List<string> result = new List<string>(keywords.Select(f => f.Keyword));

                return result;
            }
        }
    }
}
