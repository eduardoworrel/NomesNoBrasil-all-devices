using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Categoria{
    public int Id {get; set;}
    public string Titulo {get; set;}
    public string Color {get; set;}
    public string Emoji {get; set;}
    public string PrincipalNameIndex {get; set;}
    public string SearchTabIndex {get; set;}
    [NotMapped]
    public int Count {get; set;}
    
}