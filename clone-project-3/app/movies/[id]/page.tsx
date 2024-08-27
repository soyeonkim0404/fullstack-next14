import DetailUI from './detail-ui';
import { getMovie } from '../../../actions/movieAcitons';

export default async function MovieDetail({ params }) {
  const movie = await getMovie(params.id);
  return (
    <div className="py-16 flex items-center bg-blue-50 w-full absolute top-0 bottom-0 left-0 right-0">
      {movie ? <DetailUI movie={movie} /> : <div>Movie does not exists</div>}
    </div>
  );
}
