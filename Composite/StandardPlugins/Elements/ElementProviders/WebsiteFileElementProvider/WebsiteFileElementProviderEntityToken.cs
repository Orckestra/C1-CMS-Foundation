using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(WebsiteFileProviderEntityTokenSecurityAncestorProvider))]
    public sealed class WebsiteFileElementProviderEntityToken : EntityToken
    {
        private string _providerName;

        public WebsiteFileElementProviderEntityToken(string providerName, string path, string rootPath)
        {
            this.Path = path;
            this.RootPath = rootPath;
            _providerName = providerName;
        }

        public override string Type
        {
            get { return ""; }
        }


        public override string Source
        {
            get { return _providerName; }
        }


        public override string Id
        {
            get { return this.Path; }
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "RootPath", this.RootPath);

            return sb.ToString();
        }


        public static EntityToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic;
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id, out dic);

            string rootPath = StringConversionServices.DeserializeValueString(dic["RootPath"]);

            return new WebsiteFileElementProviderEntityToken(source, id, rootPath);
        }


        public string Path
        {
            get;
            private set;
        }


        internal string RootPath
        {
            get;
            private set;
        }


        internal bool IsRoot
        {
            get { return this.Path == this.RootPath; }
        }


        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as WebsiteFileElementProviderEntityToken;

            if (entityToken == null) return false;

            return Equals(entityToken);
        }


        public bool Equals(WebsiteFileElementProviderEntityToken entityToken)
        {
            if (entityToken.GetHashCode() != GetHashCode()) return false;

            return entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.Id == this.Id &&
                   entityToken.Path == this.Path &&
                   entityToken.RootPath == this.RootPath;
        }


        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                this.HashCode = GetType().GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode() ^ this.Path.GetHashCode() ^ this.RootPath.GetHashCode();
            }
            return this.HashCode;
        }
    }
}
