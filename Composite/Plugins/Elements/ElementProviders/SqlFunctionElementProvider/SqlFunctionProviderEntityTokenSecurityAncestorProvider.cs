using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Collections;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.Core.Extensions;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    internal sealed class SqlFunctionProviderEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if ((entityToken is SqlFunctionProviderRootEntityToken))
            {
                return new EntityToken[] { };
            }
            else if ((entityToken is SqlFunctionProviderFolderEntityToken))
            {
                SqlFunctionProviderFolderEntityToken token = entityToken as SqlFunctionProviderFolderEntityToken;

                NamespaceTreeBuilder builder = (NamespaceTreeBuilder)ElementFacade.GetData(new ElementProviderHandle(token.Source), token.ConnectionId);

                NamespaceTreeBuilderFolder folder = builder.FindFolder(f => StringExtensionMethods.CreateNamespace(f.Namespace, f.Name, '.') == token.Id);

                if (folder == null)
                {
                    return null;
                }
                else
                {
                    int idx = token.Id.LastIndexOf('.');
                    if (idx != -1)
                    {
                        return new EntityToken[] { new SqlFunctionProviderFolderEntityToken(token.Id.Remove(idx), token.Source, token.ConnectionId) };
                    }
                    else
                    {
                        Guid id = new Guid(token.ConnectionId);
                        ISqlConnection sqlConnection = DataFacade.GetData<ISqlConnection>(f => f.Id == id).SingleOrDefault();

                        if (sqlConnection == null)
                        {
                            return new EntityToken[] { };
                        }

                        return new EntityToken[] { sqlConnection.GetDataEntityToken() };
                    }
                }
            }
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
