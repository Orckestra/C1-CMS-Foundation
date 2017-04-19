using System.Collections.Generic;
using System.IO;
using Composite.C1Console.Security;
using Composite.Core.IO;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    internal sealed class WebsiteFileProviderEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            WebsiteFileElementProviderEntityToken castedEntityToken = (WebsiteFileElementProviderEntityToken)entityToken;

            if ((C1File.Exists(castedEntityToken.Path) == false) &&
                (C1Directory.Exists(castedEntityToken.Path) == false))
            {
                return null;
            }

            string newFolderPath = Path.GetDirectoryName(castedEntityToken.Path);

            string rootFolder = castedEntityToken.RootPath;

            if (newFolderPath != rootFolder)
            {
                Verify.That(newFolderPath.Length > rootFolder.Length, 
                            "File/folder path '{0}' does not much root folder '{1}'",
                            newFolderPath, rootFolder);

                return new EntityToken[] { new WebsiteFileElementProviderEntityToken(castedEntityToken.Source, newFolderPath, castedEntityToken.RootPath) };
            }
            
            return new EntityToken[] { new WebsiteFileElementProviderRootEntityToken(castedEntityToken.Source, castedEntityToken.RootPath) };
        }
    }
}
