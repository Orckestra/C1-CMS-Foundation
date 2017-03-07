using Composite.Plugins.Components.ComponentsEndpoint;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Search;

namespace Composite.Plugins.Search.Endpoint
{
    /// <exclude />
    public class ConsoleSearchPageStructure
    {
        /// <exclude />
        public string Name => "search";
        /// <exclude />
        public string Type => "search";
        /// <exclude />
        public string SearchProvider => "searchProvider";
        /// <exclude />
        public string UrlColumn => "label";
        /// <exclude />
        public ProviderResponse[] Providers => new ProviderResponse[] {new ConsoleSearchProviderResponse()};

        /// <exclude />
        public string Placeholder => Texts.SearchPage_SearchHerePlaceholder;
        /// <exclude />
        public string NoResultsFound => Texts.SearchPage_NoResultFound_Template;
        /// <exclude />
        public string SingleResultFound => Texts.SearchPage_SingleResultFound_Template;
        /// <exclude />
        public string MultipleResultsFound => Texts.SearchPage_MultipleResultsFound_Template;
    }

    /// <exclude />
    public class ConsoleSearchProviderResponse: ProviderResponse
    {
        /// <exclude />
        public override string Name => "searchProvider";

        /// <exclude />
        public override string Uri => ConsoleSearchRpcService.WampProcedureName;
    }
}
