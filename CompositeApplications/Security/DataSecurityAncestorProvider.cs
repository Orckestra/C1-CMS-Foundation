using System;
using System.Collections.Generic;
using Composite.Data.Hierarchy;
using Composite.Data;


namespace Composite.Security
{
    public sealed class DataSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            DataEntityToken dataEntityToken = entityToken as DataEntityToken;

            if (dataEntityToken == null) throw new ArgumentException(string.Format("The type of the entityToken should be of type {0}", typeof(DataEntityToken)), "entityToken");

            IData data = dataEntityToken.Data;
            if(data == null) return null; // A piece of data may be deleted to this point

            using (new DataScope(data.DataSourceId.DataScopeIdentifier, data.DataSourceId.LocaleScope))
            {
                IData parent = DataAncestorFacade.GetParent(dataEntityToken.Data);
                if (parent == null)
                {
                    return null;
                }

                return new List<EntityToken> { parent.GetDataEntityToken() };                
            }
        }
    }
}
