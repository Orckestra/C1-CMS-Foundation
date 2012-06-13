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
        private readonly string _relativeFilePath;

        /// <summary>
        /// Initializes a new instance of the <see cref="SharedCodeFileEntityToken"/> class.
        /// </summary>
        /// <param name="relativeFilePath">The relative file path.</param>
        public SharedCodeFileEntityToken(string relativeFilePath)
        {
            _relativeFilePath = relativeFilePath;
        }

        public override string Type { get { return "_"; } }
        public override string Source { get { return "_"; } }
        public override string Id { get { return "_"; } }
        public override string Serialize() { return _relativeFilePath; }

        /// <summary>
        /// Gets the relative file path.
        /// </summary>
        public string RelativeFilePath
        {
            get { return _relativeFilePath; }
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            return new SharedCodeFileEntityToken(serializedData);
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
