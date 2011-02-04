using System;


namespace Composite.Data
{
    /// <summary>
    /// This interface is used togehter with the attribute <see cref="BuildNewHandlerAttribute"/>.
    /// It is possible to overwrite the default behavior when a new data item is created through the method <see cref="DataConnection.New"/>
    /// To do this, you have to implement this interface and attach it to your <see cref="IData"/> type by using the attribute <see cref="BuildNewHandlerAttribute"/>
    /// <example>
    /// <code>
    /// [BuildNewHandlerAttribute(typeof(MyBuildNewHandler))
    /// [AutoUpdateble]
    /// [KeyPropertyName("Id")]
    /// [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    /// [ImmutableTypeId("{10D6CA29-5B01-45EE-9405-9B027F4C949C}")]    
    /// interface IMyDataType : IData
    /// {
    ///     [StoreFieldType(PhysicalStoreFieldType.Guid)]
    ///     [ImmutableFieldId("{B99F4AF2-859D-4235-887B-E5A06BBB9892}")]
    ///     Guid Id { get; set; }
    ///         
    ///     [StoreFieldType(PhysicalStoreFieldType.String, 256)]
    ///     [ImmutableFieldId("{A8127C77-5083-4409-9EA6-1E3BB696310D}")]
    ///     string Name { get; set; }
    /// }
    /// 
    /// class MyBuildNewHandler : IBuildNewHandler
    /// {
    ///     public Type GetTypeToBuild(Type dataType)
    ///     {
    ///         /* dataType will always be typeof(IMyDataType) */
    ///         
    ///         return typeof(MyDataType);
    ///     }
    /// }
    /// 
    /// 
    /// class MyDataType : IMyDataType
    /// {
    ///     puglic MyDataType()
    ///     {
    ///         /* All new instances of IMyDataType will becrated through this constructor */
    ///         this.Id = Guid.NewGuid();
    ///         this.Name = "RandomName";
    ///     }
    ///     
    ///     public Id { get; set; }
    ///     
    ///     public Name { get; set; }
    /// }
    /// </code>
    /// </example>
    /// </summary>
    public interface IBuildNewHandler
    {
        /// <summary>
        /// The method should return a type with parameterless constructor that will be used to create a new <see cref="IData"/> instance.
        /// The returned type is used by C1 to construct a new object when <see cref="DataConnection.New"/> is called.
        /// </summary>
        /// <param name="dataType">
        /// The data interface type in question. This interface type is inheriting <see cref="IData"/>.
        /// And the interface type is also decorated with the attribute <see cref="BuildNewHandlerAttribute"/>.
        /// </param>
        /// <returns>Should return a type that will be used to create an object that implements the given <paramref name="dataType"/> interface.</returns>
        Type GetTypeToBuild(Type dataType);
    }
}
