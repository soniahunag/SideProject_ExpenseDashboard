using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SideProject_Transcation.Data;
using SideProject_Transcation.Model;

namespace SideProject_Transcation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction_Model>>> GetTransactions()
        {
            return await _context.Transactions
                .OrderByDescending(t => t.TxnDate)
                .ToListAsync();
        }

        // GET: api/Transaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction_Model>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // POST: api/Transaction
        [HttpPost]
        public async Task<ActionResult<Transaction_Model>> PostTransaction(Transaction_Model transaction)
        {
            transaction.CreatedAt = DateTime.UtcNow;
            transaction.UpdatedAt = DateTime.UtcNow;
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
        }

        // PUT: api/Transaction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, Transaction_Model transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            var existing = await _context.Transactions.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Type = transaction.Type;
            existing.Amount = transaction.Amount;
            existing.Category = transaction.Category;
            existing.TxnDate = transaction.TxnDate;
            existing.Note = transaction.Note;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Transaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
