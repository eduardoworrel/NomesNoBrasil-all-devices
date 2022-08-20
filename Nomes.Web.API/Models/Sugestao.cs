using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Sugestao{
    public int Id {get; set;}
    public string? Mensagem {get; set;}    
}