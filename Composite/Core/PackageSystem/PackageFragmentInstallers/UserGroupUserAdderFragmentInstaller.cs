using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UserGroupUserAdderFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<string> _names = new List<string>();


        /// <exclude />
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



        /// <exclude />
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
