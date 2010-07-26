using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Types;
using System.Reflection;


namespace Composite.Security
{
    public sealed class EntityTokenHtmlPrettyfier
    {
        private Dictionary<string, Action<string, object, EntityTokenHtmlPrettyfierHelper>> _customProperties = new Dictionary<string, Action<string, object, EntityTokenHtmlPrettyfierHelper>>();

        public EntityToken EntityToken { get; set; }
        public Dictionary<string, string> PiggyBag { get; set; }


        public EntityTokenHtmlPrettyfier(EntityToken entityToken, Dictionary<string, string> piggybag)
        {
            this.EntityToken = entityToken;
            this.PiggyBag = piggybag;
        }


        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteType = (token, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", token.Type });
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteSource = (token, helper) => helper.AddFullRow(new string[] { "<b>Source</b>", token.Source });
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteId = (token, helper) => helper.AddFullRow(new string[] { "<b>Id</b>", token.Id });
        public static Action<string, object, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteCustomProperty = (name, value, helper) => helper.AddFullRow(new string[] { "<b>" + name + "</b>", value.ToString() });
        public static Action<string, string, EntityTokenHtmlPrettyfierHelper> DefaultOnPiggyBagEntry = (key, value, helper) =>
        {
            if (key.StartsWith("ParentEntityToken") == true)
            {
                EntityToken et = EntityTokenSerializer.Deserialize(value);
                helper.AddFullRow(new string[] { "<b>" + key + "</b>", string.Format("Type = {0}", et.GetType()) });
            }
            else
            {
                helper.AddFullRow(new string[] { "<b>" + key + "</b>", value });
            }
        };

        public static Action<SecurityAncestorProviderAttribute, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteSecurityAncestorProvider = (attribute, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", attribute.GetType().FullName });
        public static Action<IAuxiliarySecurityAncestorProvider, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteAuxiliarySecurityAncestorProvider = (provider, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", provider.GetType().FullName });


        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteType = DefaultOnWriteType;
        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteSource = DefaultOnWriteSource;
        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteId = DefaultOnWriteId;
        public static Action<string, object, EntityTokenHtmlPrettyfierHelper> OnWriteCustomProperty = DefaultOnWriteCustomProperty;
        public Action<string, string, EntityTokenHtmlPrettyfierHelper> OnPiggyBagEntry = DefaultOnPiggyBagEntry;
        public Action<SecurityAncestorProviderAttribute, EntityTokenHtmlPrettyfierHelper> OnWriteSecurityAncestorProvider = DefaultOnWriteSecurityAncestorProvider;
        public Action<IAuxiliarySecurityAncestorProvider, EntityTokenHtmlPrettyfierHelper> OnWriteAuxiliarySecurityAncestorProvider = DefaultOnWriteAuxiliarySecurityAncestorProvider;



        public void AddCustomSimpleProperty(string propertyName)
        {
            _customProperties.Add(propertyName, DefaultOnWriteCustomProperty);
        }



        public void AddCustomProperty(string propertyName, Action<string, object, EntityTokenHtmlPrettyfierHelper> onWriteAction)
        {
            _customProperties.Add(propertyName, onWriteAction);
        }



        public string GetResult()
        {
            EntityTokenHtmlPrettyfierHelper helper = new EntityTokenHtmlPrettyfierHelper();

            helper.StartTable();
            helper.AddHeading("<b>Basic Information</b>");
            OnWriteType(this.EntityToken, helper);
            OnWriteSource(this.EntityToken, helper);
            OnWriteId(this.EntityToken, helper);


            helper.AddHeading("<b>Custom Properties</b>");
            foreach (var kvp in _customProperties)
            {
                PropertyInfo propertyInfo = this.EntityToken.GetType().GetPropertiesRecursively().Where(f => f.Name == kvp.Key).Single();
                kvp.Value(kvp.Key, propertyInfo.GetValue(this.EntityToken, null), helper);
            }


            helper.AddHeading("<b>Piggybag</b>");
            foreach (var kvp in this.PiggyBag)
            {
                OnPiggyBagEntry(kvp.Key, kvp.Value, helper);
            }


            helper.AddHeading("<b>SecurityAncestorProvider</b>");
            SecurityAncestorProviderAttribute attribute = this.EntityToken.GetType().GetCustomAttributesRecursively<SecurityAncestorProviderAttribute>().SingleOrDefault();
            OnWriteSecurityAncestorProvider(attribute, helper);


            helper.AddHeading("<b>AuxiliarySecurityAncestorProviders</b>");
            foreach (IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider in AuxiliarySecurityAncestorFacade.GetAuxiliaryAncestorProviders(this.EntityToken.GetType()))
            {
                OnWriteAuxiliarySecurityAncestorProvider(auxiliarySecurityAncestorProvider, helper);
            }

            helper.EndTable();

            return helper.GetResult();
        }
    }
}
