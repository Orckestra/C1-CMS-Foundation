using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// Adds all the users to the specified user group. Assign language permissions to those groups. Used in starter site packages.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UserGroupUserAdderFragmentInstaller : BasePackageFragmentInstaller
    {
        private readonly List<string> _names = new List<string>();


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            XElement usergroupNamesElement = this.Configuration.FirstOrDefault(f => f.Name == "UsergroupNames");
            if (usergroupNamesElement == null) yield break;

            foreach (XElement usergroupNameElement in usergroupNamesElement.Elements("UsergroupName"))
            {
                XAttribute nameAttribute = usergroupNameElement.Attribute("Name");
                if (nameAttribute == null) continue;

                _names.Add(nameAttribute.Value);
            }
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            foreach (string usergroupName in _names)
            {
                IUserGroup userGroup = DataFacade.GetData<IUserGroup>().SingleOrDefault(f => f.Name == usergroupName);
                if (userGroup == null) continue;

                IEnumerable<IUser> users = DataFacade.GetData<IUser>().Evaluate();

                foreach (IUser user in users)
                {
                    var userUserGroupRelation = DataFacade.BuildNew<IUserUserGroupRelation>();
                    userUserGroupRelation.UserId = user.Id;
                    userUserGroupRelation.UserGroupId = userGroup.Id;
                    DataFacade.AddNew<IUserUserGroupRelation>(userUserGroupRelation);
                }

                foreach (var cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
                {
                    var userGroupActiveLocale = DataFacade.BuildNew<IUserGroupActiveLocale>();
                    userGroupActiveLocale.UserGroupId = userGroup.Id;
                    userGroupActiveLocale.CultureName = cultureInfo.Name;
                    DataFacade.AddNew<IUserGroupActiveLocale>(userGroupActiveLocale);
                }
            }

            yield break;
        }
    }
}
