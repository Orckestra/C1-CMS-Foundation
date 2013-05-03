using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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


        private static string Strong(string text)
        {
            return "<b>" + HttpUtility.HtmlEncode(text) + "</b>";
        }

        internal static string GetTypeHtml(Type type)
        {
            return GetTypeHtml(type.FullName); 
        }

        internal static string GetTypeHtml(string fullTypeName)
        {
            int dotIndex = fullTypeName.LastIndexOf(".", StringComparison.Ordinal);

            if (dotIndex <= 0)
            {
                return fullTypeName;
            }
            
            return "<span style=\"color: #A0A0A0\">" + fullTypeName.Substring(0, dotIndex + 1) + "</span>" + fullTypeName.Substring(dotIndex + 1);
        }


        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteEntityTokenType = 
            (token, helper) => helper.AddFullRow(new [] { Strong("EntityToken"), GetTypeHtml( token.GetType() ) });

        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteType = 
            (token, helper) => helper.AddFullRow(new [] { Strong("Type"), GetTypeHtml( token.Type )});

        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteSource = 
            (token, helper) => helper.AddFullRow(new [] { Strong("Source"), token.Source });

        /// <exclude />
        public static Action<EntityToken, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteId = 
            (token, helper) => helper.AddFullRow(new [] { Strong("Id"), token.Id });

        /// <exclude />
        public static Action<string, object, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteCustomProperty = 
            (name, value, helper) => helper.AddFullRow(new [] { Strong(name), value.ToString() });

        /// <exclude />
        public static Action<string, string, EntityTokenHtmlPrettyfierHelper> DefaultOnPiggyBagEntry = 
            (key, value, helper) => {
                string valueStr = value;

                if (key.StartsWith("ParentEntityToken"))
                {
                    EntityToken et = EntityTokenSerializer.Deserialize(value);
                    valueStr = string.Format("Type = {0}", GetTypeHtml( et.GetType() ));
                }

                helper.AddFullRow(new[] { "<b>" + key + "</b>", valueStr });
            };

        /// <exclude />
        public static Action<SecurityAncestorProviderAttribute, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteSecurityAncestorProvider =
            (attribute, helper) => helper.AddFullRow(new[] { "<b>Type</b>", GetTypeHtml(attribute.GetType()) });

        /// <exclude />
        public static Action<IAuxiliarySecurityAncestorProvider, EntityTokenHtmlPrettyfierHelper> DefaultOnWriteAuxiliarySecurityAncestorProvider =
            (provider, helper) => helper.AddFullRow(new[] { "<b>Type</b>", GetTypeHtml(provider.GetType()) });

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
