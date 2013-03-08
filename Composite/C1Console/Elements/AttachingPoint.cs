using System;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider;


namespace Composite.C1Console.Elements
{
    // This class is dependend on the values in the configuration
    /// <exclude />
    public sealed class AttachingPoint
    {
        private static AttachingPoint _rootPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "ID01", Source = "VirtualElementProvider" };

        private static AttachingPoint _contentPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "ContentPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _contentPerspectiveWebsiteItemsAttachingPoint = new AttachingPoint { EntityTokenType = typeof(GeneratedDataTypesElementProviderRootEntityToken), Id = "GlobalDataTypeFolder", Source = "GlobalDataOnlyGeneratedDataTypesElementProvider" };

        private static AttachingPoint _mediaPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "MediaPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _dataPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "DatasPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _designPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "DesignPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _functionPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "FunctionsPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _systemPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "SystemPerspective", Source = "VirtualElementProvider" };


        /// <exclude />
        public static AttachingPoint PerspectivesRoot { get { return _rootPerspectiveAttachingPoint; } }

        /// <exclude />
        public static AttachingPoint ContentPerspective { get { return _contentPerspectiveAttachingPoint; } }
        /// <exclude />
        public static AttachingPoint ContentPerspectiveWebsiteItems { get { return _contentPerspectiveWebsiteItemsAttachingPoint; } }

        /// <exclude />
        public static AttachingPoint MediaPerspective { get { return _mediaPerspectiveAttachingPoint; } }
        /// <exclude />
        public static AttachingPoint DataPerspective { get { return _dataPerspectiveAttachingPoint; } }
        /// <exclude />
        public static AttachingPoint DesignPerspective { get { return _designPerspectiveAttachingPoint; } }
        /// <exclude />
        public static AttachingPoint LayoutPerspective { get { return _designPerspectiveAttachingPoint; } }
        /// <exclude />
        public static AttachingPoint FunctionPerspective { get { return _functionPerspectiveAttachingPoint; } }
        /// <exclude />
        public static AttachingPoint SystemPerspective { get { return _systemPerspectiveAttachingPoint; } }


        private EntityToken _entityToken = null;

        internal AttachingPoint(EntityToken entityToken = null)
        {
            _entityToken = entityToken;
        }



        internal AttachingPoint(AttachingPoint attachingPoint)
        {
            _entityToken = attachingPoint._entityToken;
            EntityTokenType = attachingPoint.EntityTokenType;
            Id = attachingPoint.Id;
            Source = attachingPoint.Source;
        }


        internal Type EntityTokenType { get; set; }
        internal string Id { get; set; }
        internal string Source { get; set; }

        /// <exclude />
        public EntityToken EntityToken
        {
            get
            {
                if (_entityToken == null)
                {                    
                    if (this.EntityTokenType == typeof(VirtualElementProviderEntityToken))
                    {
                        _entityToken = new VirtualElementProviderEntityToken("VirtualElementProvider", this.Id);
                    }
                    else if (this.EntityTokenType == typeof(GeneratedDataTypesElementProviderRootEntityToken))
                    {
                        _entityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.Source, this.Id);
                    }
                    else
                    {
                        throw new NotImplementedException();
                    }
                }

                return _entityToken;
            }
        }
    }

}
