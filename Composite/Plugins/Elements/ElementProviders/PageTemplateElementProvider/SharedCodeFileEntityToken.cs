using System;
using System.Collections.Generic;
using Composite.C1Console.Security;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    /// <summary>
    /// Represents an entity token for a shared code file
    /// </summary>
    [SecurityAncestorProvider(typeof(SharedCodeFileEntityToken.SharedCodeFileSecurityAncestorProvider))]
    public class SharedCodeFileEntityToken : EntityToken
    {
        private readonly string _virtualPath;

        /// <summary>
        /// Initializes a new instance of the <see cref="SharedCodeFileEntityToken"/> class.
        /// </summary>
        /// <param name="virtualPath">The relative file path.</param>
        public SharedCodeFileEntityToken(string virtualPath)
        {
            _virtualPath = virtualPath;
        }

        /// <exclude />
        public override string Type { get { return "_"; } }
        /// <exclude />
        public override string Source { get { return "_"; } }
        /// <exclude />
        public override string Id { get { return "_"; } }
        /// <exclude />
        public override string Serialize() { return _virtualPath; }

        /// <summary>
        /// Gets the relative file path.
        /// </summary>
        public string VirtualPath
        {
            get { return _virtualPath; }
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            return new SharedCodeFileEntityToken(serializedData);
        }

        /// <exclude />
        public override bool Equals(object obj)
        {
            return base.Equals(obj) && (obj as SharedCodeFileEntityToken).VirtualPath == VirtualPath;
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return base.GetHashCode() ^ VirtualPath.GetHashCode();
        }

        internal class SharedCodeFileSecurityAncestorProvider : ISecurityAncestorProvider
        {
            public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
            {
                return new[] { new SharedCodeFolderEntityToken() };
            }
        }
    }
}
