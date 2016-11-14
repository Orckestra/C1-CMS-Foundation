using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.C1Console.Search
{
    /// <summary>
    /// Console search functionality
    /// </summary>
    public static class SearchFacade
    {
        const int AncestorCheckLevelsDeep = 20;

        /// <summary>
        /// Gets the document sources
        /// </summary>
        public static IEnumerable<ISearchDocumentSource> DocumentSources => 
            ServiceLocator.ApplicationServices.GetServices<ISearchDocumentSource>();

        /// <summary>
        /// Gets or sets the search provider
        /// </summary>
        public static ISearchProvider SearchProvider
            => ServiceLocator.ApplicationServices.GetService<ISearchProvider>();

        /// <summary>
        /// Indicates whether search functionality is enabled
        /// </summary>
        public static bool SearchEnabled => SearchProvider != null;

        /// <summary>
        /// Executes a search query
        /// </summary>
        /// <param name="query"></param>
        /// <param name="applySecurity"></param>
        /// <param name="searchRoot"></param>
        /// <returns></returns>
        public static async Task<SearchResult> SearchConsoleAsync(SearchQuery query, bool applySecurity = true, EntityToken searchRoot = null)
        {
            if (!SearchEnabled)
            {
                return SearchResult.Empty;
            }

            var result = await SearchFacade.SearchProvider.SearchAsync(query);

            var documents = result.Documents;
            if (applySecurity || searchRoot != null)
            {
                return new SearchResult
                {
                    Documents = Filter(documents, applySecurity, searchRoot),
                    Facets = result.Facets,
                    TotalHits = result.TotalHits
                };
            }

            return result;
        }

        private static IEnumerable<SearchDocument> Filter(
            IEnumerable<SearchDocument> documents, 
            bool applySecurity, 
            EntityToken searchRoot)
        {
            CurrentUserSecurityData userSecurityData = applySecurity ? new CurrentUserSecurityData() : null;

            foreach (var doc in documents)
            {
                EntityToken entityToken;
                try
                {
                    entityToken = EntityTokenSerializer.Deserialize(doc.SerializedEntityToken);
                }
                catch(Exception ex)
                {
                    // TODO: collect documents with invalid entity tokens
                    Log.LogWarning(nameof(SearchFacade), ex);
                    continue;
                }

                if (userSecurityData != null && !userSecurityData.UserHasAccessTo(entityToken))
                {
                    continue;
                }

                if (searchRoot != null && !EntityTokenHasAncestor(entityToken, searchRoot))
                {
                    continue;
                }

                yield return doc;
            }
        }

        private static bool EntityTokenHasAncestor(EntityToken entityToken, EntityToken ancestorEntityToken)
        {
            return ParentsFacade.GetAllParents(entityToken, AncestorCheckLevelsDeep).Contains(ancestorEntityToken);
        }

        private class CurrentUserSecurityData
        {
            private readonly UserToken _userToken;
            private readonly IEnumerable<UserPermissionDefinition> _userPermissionDefinitions;
            private readonly IEnumerable<UserGroupPermissionDefinition> _userGroupPermissionDefinition;

            public CurrentUserSecurityData()
            {
                _userToken = UserValidationFacade.GetUserToken();
                _userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(_userToken.Username);
                _userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(_userToken.Username);
            }

            public bool UserHasAccessTo(EntityToken entityToken)
            {
                return PermissionTypeFacade.IsSubBrachContainingPermissionTypes(
                    _userToken, entityToken, _userPermissionDefinitions, _userGroupPermissionDefinition);
            }
        }
    }
}
