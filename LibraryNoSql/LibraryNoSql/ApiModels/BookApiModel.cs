namespace LibraryNoSql.ApiModels
{
    public class BookApiModel
    {
        public string Title { get; set; } = String.Empty;

        public int Pages { get; set; }
        public string Author { get; set; }=String.Empty;
    }
}
