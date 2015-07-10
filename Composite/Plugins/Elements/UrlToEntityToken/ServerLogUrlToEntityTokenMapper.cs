using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Trees;
using Composite.Core.WebClient;

namespace Composite.Plugins.Elements.UrlToEntityToken
{
    internal class ServerLogUrlToEntityTokenMapper: IUrlToEntityTokenMapper
    {
        public string TryGetUrl(EntityToken entityToken)
        {
            var castedEntityToken = entityToken as TreeSimpleElementEntityToken;
            if (castedEntityToken == null || castedEntityToken.Id != "system.server.log")
            {
                return null;
            }

            return UrlUtils.Combine(UrlUtils.AdminRootPath, "/content/views/log/log.aspx?hideToolbar=true");
        }

        public EntityToken TryGetEntityToken(string url)
        {
            return null;
        }
    }
}
