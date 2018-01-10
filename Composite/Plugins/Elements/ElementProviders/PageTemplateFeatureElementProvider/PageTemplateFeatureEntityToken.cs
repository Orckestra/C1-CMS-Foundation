using System.IO;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Newtonsoft.Json;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class PageTemplateFeatureEntityToken : EntityToken
    {        
        private string _id;
        private string _source;


        /// <exclude />
        public const string RootFolderId = "FeatureRoot";

        /// <exclude />
        public const string FeatureId = "FeatureElement";


        /// <exclude />
        public PageTemplateFeatureEntityToken(string id)
            :this(id, "")
        {                        
        }

        /// <exclude />
        public static PageTemplateFeatureEntityToken BuildFeatureEntityToken(string featureName)
        {
            return new PageTemplateFeatureEntityToken(FeatureId, featureName);
        }


        /// <exclude />
        public PageTemplateFeatureEntityToken(string id, string source)
        {
            _id = id;
            _source = source;
        }


        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }



        /// <exclude />
        public override string Source
        {
            get { return _source; }
        }



        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }



        /// <exclude />
        [JsonIgnore]
        public string FeatureName
        {
            get { return this.Source; }
        }


        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            
            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new PageTemplateFeatureEntityToken(id, source);
        }
    }
}
