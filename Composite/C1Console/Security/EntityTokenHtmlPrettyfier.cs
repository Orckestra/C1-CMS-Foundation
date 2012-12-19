using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Types;
using System.Reflection;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class EntityTokenHtmlPrettyfier
    {
        private Dictionary<string, Action<string, object, EntityTokenHtmlPrettyfierHelper>> _customProperties = new Dictionary<string, Action<string, object, EntityTokenHtmlPrettyfierHelper>>();

        /// <exclude />
        public EntityToken EntityToken { get; set; }

        /// <exclude />
        public Dictionary<string, string> PiggyBag { get; set; }


        /// <exclude />
        public EntityTokenHtmlPrettyfier(EntityToken entityToken, Dictionary<string, string> piggybag)
        {
            this.EntityToken = entityToken;
            this.PiggyBag = piggybag;
        }


        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteEntityTokenType = (token, helper) => helper.AddFullRow(new [] { "<b>EntityToken Type</b>", token.GetType().FullName });

        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteType = (token, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", token.Type });

        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteSource = (token, helper) => helper.AddFullRow(new string[] { "<b>Source</b>", token.Source });

        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteId = (token, helper) => helper.AddFullRow(new string[] { "<b>Id</b>", token.Id });

        /// <exclude />
        public static Action<string, object, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteCustomProperty = (name, value, helper) => helper.AddFullRow(new string[] { "<b>" + name + "</b>", value.ToString() });

        /// <exclude />
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

        /// <exclude />
        public static Action<SecurityAncestorProviderAttribute, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteSecurityAncestorProvider = (attribute, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", attribute.GetType().FullName });

        /// <exclude />
        public static Action<IAuxiliarySecurityAncestorProvider, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteAuxiliarySecurityAncestorProvider = (provider, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", provider.GetType().FullName });

        /// <exclude />
        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteEntityTokenType = DefaultOnWriteEntityTokenType;

        /// <exclude />
        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteType = DefaultOnWriteType;

        /// <exclude />
        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteSource = DefaultOnWriteSource;

        /// <exclude />
        public Action<EntityToken, EntityTokenHtmlPrettyfierHelper> OnWriteId = DefaultOnWriteId;

        /// <exclude />
        public static Action<string, object, EntityTokenHtmlPrettyfierHelper> OnWriteCustomProperty = DefaultOnWriteCustomProperty;

        /// <exclude />
        public Action<string, string, EntityTokenHtmlPrettyfierHelper> OnPiggyBagEntry = DefaultOnPiggyBagEntry;

        /// <exclude />
        public Action<SecurityAncestorProviderAttribute, EntityTokenHtmlPrettyfierHelper> OnWriteSecurityAncestorProvider = DefaultOnWriteSecurityAncestorProvider;

        /// <exclude />
        public Action<IAuxiliarySecurityAncestorProvider, EntityTokenHtmlPrettyfierHelper> OnWriteAuxiliarySecurityAncestorProvider = DefaultOnWriteAuxiliarySecurityAncestorProvider;


        /// <exclude />
        public void AddCustomSimpleProperty(string propertyName)
        {
            _customProperties.Add(propertyName, DefaultOnWriteCustomProperty);
        }


        /// <exclude />
        public void AddCustomProperty(string propertyName, Action<string, object, EntityTokenHtmlPrettyfierHelper> onWriteAction)
        {
            _customProperties.Add(propertyName, onWriteAction);
        }


        /// <exclude />
        public string GetResult()
        {
            EntityTokenHtmlPrettyfierHelper helper = new EntityTokenHtmlPrettyfierHelper();

            helper.StartTable();
            helper.AddHeading("<b>Basic Information</b>");
            OnWriteEntityTokenType(this.EntityToken, helper);
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
