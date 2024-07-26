using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Taskmaster.Server.Models;

public partial class Employee
{
    [Key]
    [Required]
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; } = null!;
    [Required]
    public string LastName { get; set; } = null!;
    [Required]
    public DateOnly BirthDate { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;
    [Required]
    [MinLength(12)]
    [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$")]


    public string Password { get; set; } = null!;
    [Required]
    public string Country { get; set; } = null!;
    [Required]
    [AllowedValues("Admin", "Employee")]
    public string Role { get; set; } = null!;
}
