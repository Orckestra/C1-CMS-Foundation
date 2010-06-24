using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Security;
using Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider;

namespace Composite.Spikes.DDZ
{
    public partial class MakeDeveloperPerspectiveActive : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Process(object sender, EventArgs e)
        {
            using (new DataScope(DataScopeIdentifier.Public))
            {
                string developerPerspectiveEntityToken = EntityTokenSerializer.Serialize(new VirtualElementProviderEntityToken("VirtualElementProvider", "DeveloperApplicationPerspective"));

                IQueryable<string> userThatHasTheDevSectionActive =
                    from activePerspective in DataFacade.GetData<IUserActivePerspective>()
                    where activePerspective.SerializedEntityToken == developerPerspectiveEntityToken
                    select activePerspective.Username;

                if (userThatHasTheDevSectionActive.FirstOrDefault() == null)
                {

                    string systemPerspectiveEntityToken = EntityTokenSerializer.Serialize(new VirtualElementProviderEntityToken("VirtualElementProvider", "SystemPerspective"));

                    List<string> usersThatCanSeeSystemPerspective =
                        (from activePerspective in DataFacade.GetData<IUserActivePerspective>()
                         where activePerspective.SerializedEntityToken == systemPerspectiveEntityToken
                         select activePerspective.Username).Distinct().ToList();

                    foreach (string username in usersThatCanSeeSystemPerspective)
                    {
                        var setting = DataFacade.BuildNew<IUserActivePerspective>();
                        setting.Username = username;
                        setting.Id = Guid.NewGuid();
                        setting.SerializedEntityToken = developerPerspectiveEntityToken;

                        DataFacade.AddNew(setting);
                    }
                }
            }
        }
    }
}