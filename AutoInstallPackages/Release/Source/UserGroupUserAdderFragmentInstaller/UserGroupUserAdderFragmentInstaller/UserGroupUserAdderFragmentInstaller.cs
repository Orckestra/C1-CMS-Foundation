using System.Collections.Generic;
using System.Xml.Linq;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Linq;
using Composite.PackageSystem;
using Composite.PackageSystem.PackageFragmentInstallers;


namespace Composite
{
    public sealed class UserGroupUserAdderFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<string> _names = new List<string>();

        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            XElement usergroupNamesElement = this.Configuration.Where(f => f.Name == "UsergroupNames").FirstOrDefault();
            if (usergroupNamesElement == null) yield break;

            foreach (XElement usergroupNameElement in usergroupNamesElement.Elements("UsergroupName"))
            {
                XAttribute nameAttribute = usergroupNameElement.Attribute("Name");
                if (nameAttribute == null) continue;

                _names.Add(nameAttribute.Value);
            }

            yield break;
        }



        public override IEnumerable<XElement> Install()
        {
            foreach (string usergroupName in _names)
            {
                IUserGroup userGroup = DataFacade.GetData<IUserGroup>().Where(f => f.Name == usergroupName).SingleOrDefault();
                if (userGroup == null) continue;

                IEnumerable<IUser> users = DataFacade.GetData<IUser>().Evaluate();

                foreach (IUser user in users)
                {
                    IUserUserGroupRelation userUserGroupRelation = DataFacade.BuildNew<IUserUserGroupRelation>();
                    userUserGroupRelation.UserId = user.Id;
                    userUserGroupRelation.UserGroupId = userGroup.Id;
                    DataFacade.AddNew<IUserUserGroupRelation>(userUserGroupRelation);
                }
            }

            yield break;
        }
    }
}
