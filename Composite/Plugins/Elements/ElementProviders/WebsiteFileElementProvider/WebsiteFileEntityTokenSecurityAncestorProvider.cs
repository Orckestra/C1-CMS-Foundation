using System.Collections.Generic;
using System.IO;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    internal sealed class WebsiteFileProviderEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            WebsiteFileElementProviderEntityToken castedEntityToken = (WebsiteFileElementProviderEntityToken)entityToken;

            if ((File.Exists(castedEntityToken.Path) == false) &&
                (Directory.Exists(castedEntityToken.Path) == false))
            {
                return null;
            }

            string newFolderPath = Path.GetDirectoryName(castedEntityToken.Path);

            if (newFolderPath != castedEntityToken.RootPath)
            {
                return new EntityToken[] { new WebsiteFileElementProviderEntityToken(castedEntityToken.Source, newFolderPath, castedEntityToken.RootPath) };
            }
            else
            {
                return new EntityToken[] { new WebsiteFileElementProviderRootEntityToken(castedEntityToken.Source) };
            }
        }
    }
}
