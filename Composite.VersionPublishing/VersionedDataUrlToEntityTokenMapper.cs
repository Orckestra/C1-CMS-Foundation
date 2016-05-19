using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.VersionPublishing
{
   class VersionedDataUrlToEntityTokenMapper : IServiceUrlToEntityTokenMapper
    {
       public string ProcessUrl(string url, EntityToken entityToken)
        {
            var dataEntityToken = entityToken as DataEntityToken;

            var data = dataEntityToken?.Data;

            var page = data as IPage;
            if (page != null)
            {
                if (!page.VersionName.IsNullOrEmpty())
                {
                    var urlBuilder = new UrlBuilder(url);
                    url = urlBuilder.FilePath + VersionNameUrlHelper.VersionNameToUrl(page.VersionName) +
                          urlBuilder.QueryString;
                }

            }
            return url;
            
        }

        public EntityToken TryGetEntityToken(string url, ref EntityToken entityToken)
        {
            var versionname = VersionNameUrlHelper.ResolveVersionName(url);
            var page = (entityToken as DataEntityToken)?.Data as IPage;
            if (page != null)
            {
                using (var dc = new DataConnection())
                {
                    dc.AddService(VersioningServiceSettings.ByName(versionname));
                    var firstOrDefault = dc.Get<IPage>()
                        .FirstOrDefault(f => f.Id == page.Id);
                    if (firstOrDefault != null)
                    {
                        var versionId = firstOrDefault.VersionId;
                        page.VersionId = versionId;
                        page.VersionName = versionname;
                        entityToken = page.GetDataEntityToken();
                        return entityToken;
                    }
                }
            }
            return entityToken;
        }

       public string CleanUrl(ref string url)
       {
           return url.Replace(@"/"+ VersionNameUrlHelper.ResolveVersionName(url), "");
       }

    }
}
