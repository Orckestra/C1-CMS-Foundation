using System;
using Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider;
using Composite.Security;
using Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider;


namespace Composite.Elements
{
    // This class is dependend on the values in the configuration
    public sealed class AttachingPoint
    {
        private static AttachingPoint _rootPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "ID01", Source = "VirtualElementProvider" };

        private static AttachingPoint _contentPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "ContentPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _contentPerspectiveWebsiteItemsAttachingPoint = new AttachingPoint { EntityTokenType = typeof(GeneratedDataTypesElementProviderRootEntityToken), Id = "GlobalDataTypeFolder", Source = "GlobalDataOnlyGeneratedDataTypesElementProvider" };

        private static AttachingPoint _mediaPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "MediaPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _dataPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "DatasPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _designPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "DesignPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _functionPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "FunctionsPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _userPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "UserPerspective", Source = "VirtualElementProvider" };
        private static AttachingPoint _systemPerspectiveAttachingPoint = new AttachingPoint { EntityTokenType = typeof(VirtualElementProviderEntityToken), Id = "SystemPerspective", Source = "VirtualElementProvider" };


        public static AttachingPoint PerspectivesRoot { get { return _rootPerspectiveAttachingPoint; } }

        public static AttachingPoint ContentPerspective { get { return _contentPerspectiveAttachingPoint; } }
        public static AttachingPoint ContentPerspectiveWebsiteItems { get { return _contentPerspectiveWebsiteItemsAttachingPoint; } }

        public static AttachingPoint MediaPerspective { get { return _mediaPerspectiveAttachingPoint; } }
        public static AttachingPoint DataPerspective { get { return _dataPerspectiveAttachingPoint; } }
        public static AttachingPoint DesignPerspective { get { return _designPerspectiveAttachingPoint; } }
        public static AttachingPoint LayoutPerspective { get { return _designPerspectiveAttachingPoint; } }
        public static AttachingPoint FunctionPerspective { get { return _functionPerspectiveAttachingPoint; } }
        public static AttachingPoint UserPerspective { get { return _userPerspectiveAttachingPoint; } }
        public static AttachingPoint SystemPerspective { get { return _systemPerspectiveAttachingPoint; } }


        private EntityToken _entityToken = null;

        internal AttachingPoint()
        {
        }


        internal Type EntityTokenType { get; set; }
        internal string Id { get; set; }
        internal string Source { get; set; }

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
