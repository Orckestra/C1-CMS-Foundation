using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Serialization;
using Newtonsoft.Json;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(WebsiteFileProviderEntityTokenSecurityAncestorProvider))]
    public sealed class WebsiteFileElementProviderEntityToken : EntityToken
    {
        private static readonly string BaseDirectory;
        private readonly string _relativePath;

        static WebsiteFileElementProviderEntityToken()
        {
            string baseDirectory = PathUtil.BaseDirectory;
            if(baseDirectory.EndsWith("\\"))
            {
                baseDirectory = baseDirectory.Substring(0, baseDirectory.Length - 1);
            }

            BaseDirectory = baseDirectory;
        }

        /// <exclude />
        [JsonConstructor]
        public WebsiteFileElementProviderEntityToken(string providerName, string path, string rootPath)
        {
            Verify.ArgumentNotNull(path, "path");
            Verify.ArgumentNotNull(rootPath, "rootPath");
            Verify.ArgumentCondition(path.StartsWith(rootPath, StringComparison.OrdinalIgnoreCase), "path", "Path should start with root path");

            Verify.That(rootPath.StartsWith(BaseDirectory, StringComparison.OrdinalIgnoreCase), "Path does not belong to the website");

            _relativePath = path.Substring(BaseDirectory.Length);

            this.Path = path;
            this.RootPath = rootPath;
            ProviderName = providerName;
        }


        /// <exclude />
        public string ProviderName { get; }


        /// <exclude />
        public override string Type => "";


        /// <exclude />
        public override string Source => ProviderName;


        /// <exclude />
        public override string Id => _relativePath;


        /// <exclude />
        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedData))
            {
                entityToken = CompositeJsonSerializer.Deserialize<WebsiteFileElementProviderEntityToken>(serializedData);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedData);
                Log.LogVerbose(nameof(WebsiteFileElementProviderEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;
        }

        /// <exclude />
        public static EntityToken DeserializeLegacy(string serializedData)
        {
            Dictionary<string, string> dic;
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id, out dic);

            // Backward compatibility
            if (dic.ContainsKey("RootPath"))
            {
                string rootPath = StringConversionServices.DeserializeValueString(dic["RootPath"]);

                return new WebsiteFileElementProviderEntityToken(source, id, rootPath);
            }

            string relativeRootPath = StringConversionServices.DeserializeValueString(dic["root"]);

            return new WebsiteFileElementProviderEntityToken(source, BaseDirectory + id, BaseDirectory + relativeRootPath);
        }

        /// <exclude />
        public string Path
        {
            get;
            private set;
        }

        private string RelativeRootPath => RootPath.Substring(BaseDirectory.Length);

        [JsonProperty]
        internal string RootPath
        {
            get;
            private set;
        }


        internal bool IsRoot => this.Path == this.RootPath;


        /// <exclude />
        public override bool Equals(object obj)
        {
            return base.Equals(obj) 
                   && (obj as WebsiteFileElementProviderEntityToken).RootPath == this.RootPath;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                this.HashCode = GetType().GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode() ^ this.RelativeRootPath.GetHashCode();
            }
            return this.HashCode;
        }
    }
}
