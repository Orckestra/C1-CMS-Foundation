using System;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("DataLogTraceListener isn't used any more")]
    [ImmutableTypeId("{EF5063AE-E686-426d-8FA1-6EC589C91EA9}")]
    [AutoUpdateble]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [NotReferenceableAttribute]
    public interface ILogEntry : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{7FF54052-3FCD-4d21-B363-29950D7BA527}")]
        Guid Id { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{95B17A9B-E77B-43a0-9ED9-11C4E3430DAB}")]
        string Title { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{631083D6-AE0B-4417-ADFB-437A517D5396}")]
        string Message { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{7AFEC920-EE65-49ca-A5FE-AB4D311FC90E}")]
        string TraceEventType { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{F64AB2C3-632E-41d9-AD98-648FFF6F12B6}")]
        DateTime TimeStamp { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{86C75186-C75E-4e58-89C9-DF11D4F78C88}")]
        int Priority { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{870E0AFD-FBA3-4a77-9F6D-087C1BD7E55D}")]
        string AppDomainName { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{5D3AE3DB-3742-4402-87E9-386FD0FED521}")]
        string MachineName { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 512, IsNullable = true)]
        [ImmutableFieldId("{7A484552-4C94-491c-AA43-7393DD799775}")]
        string HttpRequestUrl { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 512, IsNullable=true)]
        [ImmutableFieldId("{ABB3F2E2-07B5-4554-AA32-5B12533345A1}")]
        string HttpReferingUrl { get; set; }
    }
}
